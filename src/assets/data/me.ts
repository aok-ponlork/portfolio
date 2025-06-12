import { UserModel } from '../../app/core/models/user.model';

export const ME: UserModel = {
  aboutMe: `Web developer and graduate of the <a class="font-bold roboto-bold" href="https://www.pse.ngo/" target="_blank">PSE</a>-sponsored program at <a class="font-bold roboto-bold" href="https://www.setecu.com/" target="_blank">SETEC INSTITUTE</a>. I build robust web apps using Angular & .NET for enterprise systems and Laravel for freelance work. I turn complex problems into scalable solutions and Exploring cloud and DevOps to level up my stack. I turn complex problems into scalable solutions and am exploring cloud and DevOps to level up my stack.`,
  name: 'AOK PONLORK',
  email: 'aok4ponlork@gmail.com',
  location: 'Phnom Penh, Cambodia',
  telegram: 'https://t.me/aok_ponlork',

  image: '',

  skills: [
    'Programming Languages: PHP, C#, JavaScript, TypeScript, SQL, Python, Dart',
    'Frameworks & Tools: Angular, Laravel, .NET, Node.js, Flutter, HTML/CSS, Tailwind CSS',
    'Database Management: MySQL, PostgreSQL, MongoDB, SQL Server, Firebase Firestore, SQLite',
    'API Development & Version Control: RESTful APIs, GraphQL, Git, GitHub',
    'DevOps & Cloud Services: Docker, Firebase, Cloudflare, Microservices',
  ],

  additional: [
    { title: 'CI/CD with Jenkins', isProcessing: true },
    { title: 'Container Orchestration with Kubernetes', isProcessing: true },
    { title: 'Ubuntu Server Management', isProcessing: false },
    { title: 'Mikrotik Router Configuration', isProcessing: false },
    { title: 'Communication & Problem-Solving', isProcessing: false },
    { title: 'Windows Configuration', isProcessing: false },
    { title: 'Microsoft Office Suite', isProcessing: false },
    { title: 'Adobe Tools', isProcessing: false },
  ],

  education: [
    {
      title: 'Bachelor of Science in Management Information Systems (MIS)',
      content: 'SETEC INSTITUTE, 2021 - 2025',
    },
  ],

  certificate: [],

  experiences: [
    {
      title: 'Full-Stack Software Developer',
      content:
        'Developing and maintaining enterprise-level web applications using Angular for the frontend and .NET for the backend. I engineer scalable RESTful APIs, build responsive component-driven UIs, and collaborate within an agile team to deliver robust software solutions.',
      date: 'May 2024 - Present',
    },
    {
      title: 'Software Developer (Internship)',
      content:
        'Contributed to live commercial projects, gaining hands-on experience with Angular and .NET. Assisted in developing frontend components and RESTful API endpoints while applying industry best practices in version control and team collaboration.',
      date: 'Feb 2024 - May 2024',
    },
    {
      title: 'Freelance Web Developer',
      content:
        'Designed, developed, and deployed custom web applications for small business clients using the Laravel framework. I managed the full project lifecycle, from initial client consultation to final delivery and maintenance.',
      date: 'Jun 2023 - Jan 2024',
    },
  ],

  projects: [
    {
      title: 'Admin Dashboard for Appointment & CRM',
      content:
        'Built a feature-rich admin panel to manage appointments, CRM data, and coupon sales, with real-time push notifications. Built with: Angular, ng-zorro, Tailwind CSS, and Firebase Cloud Messaging (FCM).',
    },
    {
      title: 'Secure .NET API with Firebase Authentication',
      content:
        'Engineered a secure .NET backend service integrating Firebase for user authentication (Google/Email), validating ID tokens, and using PostgreSQL for data storage. Built with: .NET, Firebase Auth, JWT, PostgreSQL.',
    },
    {
      title: 'Full-Stack E-Commerce System (Academic Project)',
      content:
        'Developed a complete e-commerce platform featuring a Flutter mobile app and a Laravel backend, with PayPal integration for payments. Built with: Flutter, Laravel, MySQL, PayPal API, and Laravel Sanctum.',
    },
    {
      title: 'Online Football Ticket Marketplace',
      content:
        'Created a secure web platform for buying and selling event tickets, featuring payment integration and user management. Built with: Laravel, PHP, MySQL, Bootstrap, and PayPal API.',
    },
    {
      title: 'Flutter Appointment & CMS App',
      content:
        'Developed a cross-platform mobile app for booking appointments, featuring a simple CMS and real-time push notifications. Built with: Flutter, Dart, and Firebase Cloud Messaging (FCM).',
    },
    {
      title: 'Phone Product Information Website',
      content:
        'Built an admin-managed website to display phone product specifications and details, streamlining content updates. Built with: Laravel, PHP, and MySQL.',
    },
  ],
};
