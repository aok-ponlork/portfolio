import { UserModel } from '../../app/core/models/user.model';

export const ME: UserModel = {
  aboutMe: `A results-driven web developer with a degree from <a class="font-bold roboto-bold" href="https://www.setecu.com/" target="_blank" >SETEC INSTITUTE</a> sponsored by <a class="font-bold roboto-bold" href="https://www.pse.ngo/" target="_blank" >PSE</a>, And over 18 months of hands-on professional experience, I specialize in crafting high-performance web solutions that blend technical expertise with innovation. Passionate about building impactful digital experiences, I thrive on solving complex challenges and driving technological advancement.`,
  name: 'AOK PONLORK',
  email: 'aok4ponlork@gmail.com',
  location: 'Phnom Penh, Cambodia',
  telegram: 'https://t.me/aok_ponlork',
  skills: [
    'Programming Languages: PHP, C#, JavaScript, TypeScript, SQL, Python, Dart',
    'Frameworks & Tools: Angular, Node.js, HTML, CSS, Tailwind CSS, Laravel, .NET, Flutter',
    'Database Management: MySQL, PostgreSQL, MongoDB, SQL Server, Firebase Firestore, SQLite',
    'Version Control: Git, GitHub',
    'API Development: RESTful APIs, GraphQL',
    'Tools & Services: Docker, Firebase, Microservices',
  ],
  additional: [
    { title: 'Mikrotik Router Configuration', isProcessing: false },
    { title: 'Ubuntu Server Setup', isProcessing: false },
    { title: 'Windows Configuration', isProcessing: false },
    { title: 'Microsoft Office Suite', isProcessing: false },
    {
      title: 'Adobe Tools',
      isProcessing: false,
    },
    {
      title: 'Communication & Problem-Solving',
      isProcessing: false,
    },
    {
      title: 'Jenkins, CI/CD',
      isProcessing: true,
    },
    {
      title: 'Kubernetes',
      isProcessing: true,
    },
  ],
  education: [
    {
      title: 'Management Information Systems (MIS)',
      content: 'SETEC INSTITUTE, 2021 - 2025',
    },
    { title: 'High School', content: 'Phnom Penh Tmey, 2016 - 2020' },
  ],
  certificate: [],
  experiences: [
    {
      title: 'Software Developer - Full-Time',
      content:
        'Currently working as a full-time developer at RTDC for over a year after completing my internship. I focus on building and maintaining web applications using .NET for backend services, Angular for frontend development, and Flutter for cross-platform mobile app development.',
      date: 'May 2024 - Now',
    },
    {
      title: 'Internship - Software Developer',
      content:
        'Completed a 4-month internship at RTDC, where I gained hands-on experience in real-world projects, focusing on .NET for backend development and Angular for frontend development.',
      date: 'Feb 2024 - May 2024',
    },
    {
      title: 'Freelance Developer',
      content:
        'Worked as a freelance developer throughout my academic year, specializing in building web applications using Laravel.',
      date: 'Jun 2023 - Jan 2024',
    },
  ],
  projects: [
    {
      title: 'Firebase Authentication with .NET (Project)',
      content:
        'Integrated Firebase Authentication (email/password, Google) with a .NET backend, validated Firebase ID tokens, implemented JWT, and used PostgreSQL for data storage.',
    },
    {
      title: 'Admin Dashboard for Appointment & CRM Management',
      content:
        'Built a feature-rich admin dashboard with Angular, ng-zorro Ant Design, and Tailwind CSS. Integrated Firebase Cloud Messaging (FCM) for push notifications, allowing admins to manage appointments, CRM data, and coupon sales.',
    },
    {
      title: 'Flutter Appointment & CMS App',
      content:
        'Developed a Flutter-based appointment booking and CMS app with real-time push notifications via FCM, enabling seamless communication between users and admins.',
    },
    {
      title: 'Development Across Web & Mobile',
      content:
        'Worked across Angular, .NET APIs, and Flutter to create dynamic applications with real-time notifications (FCM) and integrated ABA Payway for secure transactions.',
    },
    {
      title: 'Online Football Ticket Marketplace',
      content:
        'Developed a secure ticket marketplace with PayPal integration, leveraging Laravel, Bootstrap, and MySQL for the backend and UI.',
    },
    {
      title: 'Phone Product Information Website',
      content:
        'Built an admin platform for managing phone product data using Laravel, streamlining content updates and backend operations.',
    },
    {
      title: 'E-Commerce System (Academic Project)',
      content:
        'Developed an e-commerce platform with Laravel (backend) and Flutter (frontend), integrated PayPal Sandbox for payments, and used Laravel Sanctum for authentication.',
    },
  ],
  image: '',
};
