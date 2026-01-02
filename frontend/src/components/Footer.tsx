
const Footer = () => {
  return (
    <>
      <footer className="w-full flex-center flex-col bg-background border-t-4 border-sky-900">
        <section className="pt-4 w-full flex-center flex-col">
          <img src="favicon.png" alt="logo" className="size-12" />
          <h1 className="font-semibold text-lg">User Management System</h1>
        </section>
        <section className="px-8 py-6">
          <p className="text-center text-stone-700">
            User Management System is a robust full-stack solution built with React and Express. Efficiently manage user lifecycles, monitor active profiles, and enforce security policies through a centralized administrative interface. It was basically built to understand and implement the working of RBAC systems. The applications primary purpose was to build a strong and efficient backend with a simple frontend.
          </p>
        </section>
        <section className="p-2 w-full border-t border-stone-400 flex-center flex-col">
          <span className="text-stone-900">Contact with the Developer</span>
          <section className="p-2 flex-center gap-4">
            <a
              href="https://github.com/AP-Abhishek/User-Management-System"
              target="_blank"
              className="transition-all hover:scale-110 ease-linear"
              rel="noreferrer"
            >
              <img src="github.png" alt="github" className="size-8 rounded-full bg-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/-ap-abhishek-23-03-05-/"
              target="_blank"
              className="transition-all hover:scale-110 ease-linear"
              rel="noreferrer"
            >
              <img src="linkedin.png" alt="linkedin" className="size-8 rounded-full bg-white" />
            </a>
          </section>
        </section>
        <div className="w-full py-3 bg-sky-950 text-center">
          <p className="text-xs text-sky-200">
            &copy; {new Date().getFullYear()} User Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer;
