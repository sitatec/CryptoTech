import { FC, useEffect, useState } from "react";
import { Avatar, Button, Menu, Typography } from "antd";
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
    const closeMobileMenu = () => setActiveMenu(false);
    window.addEventListener("click", closeMobileMenu);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", closeMobileMenu);
    };
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Typography.Title level={2} className="logo">
          <Link to="/">
            <Avatar src={CryptoIcon} size="large" />
            <span className="logo-text">Crypto</span>
          </Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={(e) => {
            e.stopPropagation();
            setActiveMenu(!activeMenu);
          }}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu theme="dark" items={menuItems} defaultSelectedKeys={["home"]} />
      )}
    </div>
  );
};

export default Navbar;
