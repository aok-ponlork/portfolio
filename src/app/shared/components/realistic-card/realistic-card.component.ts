import { Component, ElementRef, Input, NgZone, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-realistic-card',
  imports: [CommonModule],
  templateUrl: './realistic-card.component.html',
  styleUrl: './realistic-card.component.css',
  animations: [
    trigger('flipState', [
      state(
        'front',
        style({
          transform: 'rotateY(0deg)',
        })
      ),
      state(
        'back',
        style({
          transform: 'rotateY(180deg)',
        })
      ),
      transition(
        'front => back',
        animate('600ms cubic-bezier(0.455, 0.03, 0.515, 0.955)')
      ),
      transition(
        'back => front',
        animate('600ms cubic-bezier(0.455, 0.03, 0.515, 0.955)')
      ),
    ]),
  ],
})
export class RealisticCardComponent {
  @ViewChild('cardElement') cardElement!: ElementRef;
  @ViewChild('cardContainer') cardContainer!: ElementRef;
  @ViewChild('cable') cable!: ElementRef;

  // Card State
  flip: string = 'front';
  isDragging: boolean = false;
  isDropping: boolean = true;
  dropAnimationDone: boolean = false;

  // Physics Properties
  cardPosition = { x: 0, y: 0 };
  startPosition = { x: 0, y: 0 };
  velocity = { x: 0, y: 0 };
  acceleration = { x: 0, y: 0 };
  gravity = 0.5;
  friction = 0.95;
  swingAngle = 0;
  swingVelocity = 0;
  swingFriction = 0.98;
  cableLength = 170; // Length of the cable
  cableAnchor = { x: 0, y: 0 };

  // Mouse/Touch Tracking
  pointerStart = { x: 0, y: 0 };
  cardStart = { x: 0, y: 0 };
  lastFrameTime = 0;

  // Card Properties
  cardWidth = 300;
  cardHeight = 480;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    // Initialize with card position above the viewport
    this.cardPosition = {
      x: window.innerWidth / 2 - this.cardWidth / 2,
      y: -this.cardHeight,
    };
  }

  ngAfterViewInit() {
    // Set the cable anchor point (center top of the viewport)
    this.cableAnchor = {
      x: window.innerWidth / 2,
      y: 10,
    };

    // Start the drop animation after a slight delay
    setTimeout(() => this.startDropAnimation(), 200);

    // Add event listeners for window resize
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  startDropAnimation() {
    this.isDropping = true;
    this.lastFrameTime = performance.now();
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(this.updateDropAnimation.bind(this));
    });
  }

  updateDropAnimation(timestamp: number) {
    const deltaTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;

    if (this.isDropping) {
      // Calculate the distance from the cable anchor
      const dx = this.cardPosition.x + this.cardWidth / 2 - this.cableAnchor.x;
      const dy = this.cardPosition.y - this.cableAnchor.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Apply gravity
      this.velocity.y += this.gravity;

      // Apply tension force from the cable when extended
      if (distance > this.cableLength) {
        // Calculate the unit vector in the direction of tension
        const ux = dx / distance;
        const uy = dy / distance;

        // Calculate the amount of tension needed
        const tensionFactor = 0.1;
        const overExtension = distance - this.cableLength;

        // Apply tension force
        this.acceleration.x = -ux * overExtension * tensionFactor;
        this.acceleration.y = -uy * overExtension * tensionFactor;

        // Update velocity
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;
      }

      // Apply friction to slow down movement
      this.velocity.x *= this.friction;
      this.velocity.y *= this.friction;

      // Update position
      this.cardPosition.x += this.velocity.x;
      this.cardPosition.y += this.velocity.y;

      // Calculate swing angle for cable
      this.swingAngle = Math.atan2(
        this.cardPosition.x + this.cardWidth / 2 - this.cableAnchor.x,
        this.cardPosition.y - this.cableAnchor.y
      );

      // Update DOM
      this.updateCardPosition();

      // Check if the card has settled into a rest position
      if (
        Math.abs(this.velocity.x) < 0.1 &&
        Math.abs(this.velocity.y) < 0.1 &&
        Math.abs(distance - this.cableLength) < 1
      ) {
        this.isDropping = false;
        this.dropAnimationDone = true;
      } else {
        requestAnimationFrame(this.updateDropAnimation.bind(this));
      }
    }
  }

  updateCardPosition() {
    if (this.cardContainer && this.cardContainer.nativeElement) {
      this.cardContainer.nativeElement.style.transform = `translate(${this.cardPosition.x}px, ${this.cardPosition.y}px)`;

      // Update the cable path
      if (this.cable && this.cable.nativeElement) {
        // Calculate the card's top center point
        const cardTopCenterX = this.cardPosition.x + this.cardWidth / 2;
        const cardTopCenterY = this.cardPosition.y;

        // Create the path for the cable
        const path = `M ${this.cableAnchor.x} ${this.cableAnchor.y} Q ${
          this.cableAnchor.x
        } ${
          (this.cableAnchor.y + cardTopCenterY) / 2
        } ${cardTopCenterX} ${cardTopCenterY}`;
        this.cable.nativeElement.setAttribute('d', path);
      }
    }
  }

  handleResize() {
    // Update cable anchor when window is resized
    this.cableAnchor = {
      x: window.innerWidth / 2,
      y: 10,
    };
    this.updateCardPosition();
  }

  toggleFlip() {
    if (this.dropAnimationDone && !this.isDragging) {
      this.flip = this.flip === 'front' ? 'back' : 'front';
    }
  }

  // Drag Handling
  onDragStart(event: MouseEvent | TouchEvent) {
    if (!this.dropAnimationDone) return;

    this.isDragging = true;

    const { clientX, clientY } = this.getPointerPosition(event);
    this.pointerStart = { x: clientX, y: clientY };
    this.cardStart = { ...this.cardPosition };

    // Attach move and end events
    document.addEventListener('mousemove', this.onDragMove);
    document.addEventListener('touchmove', this.onDragMove);
    document.addEventListener('mouseup', this.onDragEnd);
    document.addEventListener('touchend', this.onDragEnd);

    // Prevent default to avoid text selection during drag
    event.preventDefault();
  }

  onDragMove = (event: MouseEvent | TouchEvent) => {
    if (!this.isDragging) return;

    const { clientX, clientY } = this.getPointerPosition(event);

    // Calculate the new position
    let newX = this.cardStart.x + (clientX - this.pointerStart.x);
    let newY = this.cardStart.y + (clientY - this.pointerStart.y);

    // Calculate distance from anchor
    const dx = newX + this.cardWidth / 2 - this.cableAnchor.x;
    const dy = newY - this.cableAnchor.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Constrain to cable length
    if (distance > this.cableLength) {
      // Scale back to match cable length
      const scale = this.cableLength / distance;
      newX = this.cableAnchor.x + dx * scale - this.cardWidth / 2;
      newY = this.cableAnchor.y + dy * scale;
    }

    // Update position
    this.cardPosition.x = newX;
    this.cardPosition.y = newY;

    // Update swing angle for natural cable movement
    this.swingAngle = Math.atan2(
      this.cardPosition.x + this.cardWidth / 2 - this.cableAnchor.x,
      this.cardPosition.y - this.cableAnchor.y
    );

    // Update DOM
    this.updateCardPosition();

    event.preventDefault();
  };

  onDragEnd = (event: MouseEvent | TouchEvent) => {
    this.isDragging = false;

    // Calculate final velocity based on difference between current and start positions
    const { clientX, clientY } = this.getPointerPosition(event);
    this.velocity.x = (clientX - this.pointerStart.x) * 0.1;
    this.velocity.y = (clientY - this.pointerStart.y) * 0.1;

    // Remove event listeners
    document.removeEventListener('mousemove', this.onDragMove);
    document.removeEventListener('touchmove', this.onDragMove);
    document.removeEventListener('mouseup', this.onDragEnd);
    document.removeEventListener('touchend', this.onDragEnd);

    // Start physics animation for settling
    this.isDropping = true;
    this.lastFrameTime = performance.now();
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(this.updateDropAnimation.bind(this));
    });

    event.preventDefault();
  };

  // Helper to get position from mouse or touch event
  private getPointerPosition(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent) {
      return { clientX: event.clientX, clientY: event.clientY };
    } else {
      const touch = event.touches[0] || event.changedTouches[0];
      return { clientX: touch.clientX, clientY: touch.clientY };
    }
  }

  ngOnDestroy() {
    // Clean up event listeners
    window.removeEventListener('resize', this.handleResize.bind(this));
    document.removeEventListener('mousemove', this.onDragMove);
    document.removeEventListener('touchmove', this.onDragMove);
    document.removeEventListener('mouseup', this.onDragEnd);
    document.removeEventListener('touchend', this.onDragEnd);
  }
}
