type NavLinks = {
  name: string;
  link: string;
}

const Navbar = () => {

  const navigations: NavLinks[] = [
    { name: "Users", link: "/users" },
    { name: "Roles", link: "/roles" }
  ]

  return (
    <>
      <nav className="flex-center">
        <ul className="flex gap-4">
          {
            navigations.map((nav) => (
              <li key={nav.name} className="text-xl">
                <a href={nav.link}>{nav.name}</a>
              </li>
            ))
          }
        </ul>
      </nav>
    </>
  )
}

export default Navbar;