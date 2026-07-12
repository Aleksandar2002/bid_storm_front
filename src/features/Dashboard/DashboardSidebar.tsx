import { useDashboardNavigation } from "./useDashboardNavigation";
import Button from "../../shared/components/global/Button";
import { useNavigate, useSearchParams } from "react-router";

const DashboardSidebar = () => {
  const links = useDashboardNavigation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleLinkClick = (entity: string) => {
    navigate("dashboard?entity=" + entity.toLowerCase());
  };

  return (
    <aside className="dashboard-sidebar shadow-dark flexcol">
      <h2 className="font-10 bold">Dashboard navigation</h2>
      <hr className="line" />
      <nav className="w-full mt-3" key={String(searchParams.get("entity"))}>
        <ul className="flexcol w-full">
          {links &&
            links.map((link) => (
              <li
                key={link.entity}
                className={
                  "w-full text-center " +
                  (searchParams.get("entity") == link.entity.toLowerCase()
                    ? "active"
                    : "")
                }
              >
                <Button
                  btnClass="w-full simple-btn light shadow-dark"
                  handleClickFunction={() => handleLinkClick(link.entity)}
                >
                  {link.title}
                </Button>
              </li>
            ))}
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
