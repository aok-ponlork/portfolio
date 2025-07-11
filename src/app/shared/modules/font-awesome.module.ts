import { NgModule } from '@angular/core';
import {
  FontAwesomeModule as FaModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faTelegram,
  faFacebookMessenger,
  faGithub,
  faFacebook,
  faAngular,
  faFlutter,
  faCss3,
  faDocker,
  faNode,
  faLaravel,
} from '@fortawesome/free-brands-svg-icons';
import {
  faLaptopCode,
  faCogs,
  faFileAlt,
  faAddressBook,
  faNewspaper,
  faUser,
  faHomeUser,
  faTimes,
  faBars,
  faEnvelope,
  faComputerMouse,
  faExpand,
  faPrint,
  faCompress,
  faPlay,
  faPause,
  faShare,
  faWandMagicSparkles,
  faWandMagic,
  faCode,
  faWind,
  faPaperPlane,
  faKey,
  faPlug,
  faStepForward,
  faPlusCircle,
  faBriefcase,
  faGraduationCap,
  faMapMarkedAlt,
  faMapMarker,
  faBookOpen,
  faPen,
  faInfoCircle,
  faFireFlameCurved,
  faCertificate,
  faUserGraduate,
  faProjectDiagram,
  faTools,
  faGamepad,
  faClock,
  faMusic,
  faThLarge,
  faCheck,
  faQrcode,
  faEdit,
  faEye,
  faDownload,
  faBolt,
  faPalette,
  faMobileAlt,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports: [FaModule],
  exports: [FaModule],
})
export class FontAwesomeShareModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faTelegram,
      faFacebookMessenger,
      faGithub,
      faFacebook,
      faAngular,
      faFlutter,
      faCogs,
      faLaptopCode,
      faFileAlt,
      faAddressBook,
      faNewspaper,
      faUser,
      faHomeUser,
      faTimes,
      faBars,
      faEnvelope,
      faComputerMouse,
      faExpand,
      faPrint,
      faCompress,
      faPlay,
      faPause,
      faShare,
      faWandMagicSparkles,
      faWandMagic,
      faCode,
      faFlutter,
      faWind,
      faCss3,
      faDocker,
      faNode,
      faPaperPlane,
      faLaravel,
      faKey,
      faPlug,
      faStepForward,
      faPlusCircle,
      faBriefcase,
      faGraduationCap,
      faMapMarkedAlt,
      faMapMarker,
      faBookOpen,
      faPen,
      faInfoCircle,
      faFireFlameCurved,
      faUserGraduate,
      faProjectDiagram,
      faTools,
      faCertificate,
      faGamepad,
      faClock,
      faMusic,
      faThLarge,
      faCheck,
      faQrcode,
      faEdit,
      faEye,
      faDownload,
      faBolt,
      faPalette,
      faMobileAlt,
      faArrowLeft
    );
  }
}
