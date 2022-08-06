import { FC, useEffect, useState } from "react";
import { Avatar, Button, Menu } from "antd";
import { Link } from "react-router-dom";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import CryptoIcon from "../images/cryptocurrency.png";
import {
  HomeOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const menuItems: ItemType[] = [
  { label: <Link to="/">Home</Link>, icon: <HomeOutlined />, key: "home" },
  {
    label: <Link to="/cryptocurrencies">Cryptocurrencies</Link>,
    icon: <FundOutlined />,
    key: "cryptocurrencies",
  },
  {
    label: <Link to="/exchanges">Exchanges</Link>,
    icon: <MoneyCollectOutlined />,
    key: "exchanges",
  },
  { label: <Link to="/news">news</Link>, icon: <BulbOutlined />, key: "news" },
];

const Navbar: FC = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(0);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);
    const closeMobileMenu = (): void => {
      if (screenSize <= 800) {
        setActiveMenu(false);
      }
    };
    window.addEventListener("click", closeMobileMenu);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", closeMobileMenu);
    };
  }, [screenSize]);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="logo">
          <Link to="/">
            <Avatar src={CryptoIcon} size="default" />
            <span className="logo-text">CryptoTech</span>
          </Link>
        </div>
        <Button
          className="menu-control-container"
          onClick={(e) => {
            e.stopPropagation();
            setActiveMenu(!activeMenu);
          }}
        >
          <MenuOutlined />
        </Button>
        {activeMenu && (
          <Menu
            className="navbar-menu"
            theme="dark"
            items={menuItems}
            defaultSelectedKeys={["home"]}
            mode={screenSize <= 1280 ? "vertical" : "horizontal"}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
