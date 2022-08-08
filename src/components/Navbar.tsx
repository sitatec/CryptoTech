import { FC, useEffect, useState } from "react";
import { Avatar, Button, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import CryptoIcon from "../images/cryptocurrency.png";
import {
  HomeOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  MenuOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import {
  CRYPTOCURRENCIES_ROUTE,
  EXCHANGES_ROUTE,
  FAVORITE_CRYPTOCURRENCIES_ROUTE,
  HOME_ROUTE,
  NEWS_ROUTE,
} from "../core/routes";

const menuItems: ItemType[] = [
  {
    label: <Link to={HOME_ROUTE}>Home</Link>,
    icon: <HomeOutlined />,
    key: HOME_ROUTE,
  },
  {
    label: <Link to={CRYPTOCURRENCIES_ROUTE}>Cryptocurrencies</Link>,
    icon: <FundOutlined />,
    key: CRYPTOCURRENCIES_ROUTE,
  },
  {
    label: <Link to={EXCHANGES_ROUTE}>Exchanges</Link>,
    icon: <MoneyCollectOutlined />,
    key: EXCHANGES_ROUTE,
  },
  {
    label: <Link to={NEWS_ROUTE}>news</Link>,
    icon: <BulbOutlined />,
    key: NEWS_ROUTE,
  },
  {
    label: <Link to={FAVORITE_CRYPTOCURRENCIES_ROUTE}>Favorites</Link>,
    icon: <HeartOutlined />,
    key: FAVORITE_CRYPTOCURRENCIES_ROUTE,
  },
];

const useResponsive = (defaultScreenSize = 0, menuVisible = true) => {
  const [isMenuVisible, setMenuVisible] = useState(menuVisible);
  const [screenSize, setScreenSize] = useState(defaultScreenSize);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    const closeSmallDeviceMenu = () => {
      if (isMenuVisible && screenSize <= 1280) {
        setMenuVisible(false);
      }
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("click", closeSmallDeviceMenu);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", closeSmallDeviceMenu);
    };
  }, [isMenuVisible, screenSize]);

  useEffect(() => {
    if (screenSize <= 1280) {
      setMenuVisible(false);
    } else {
      setMenuVisible(true);
    }
  }, [screenSize]);

  return [isMenuVisible, setMenuVisible, screenSize, setScreenSize];
};

const Navbar: FC = () => {
  const [isMenuVisible, _setMenuVisible, screenSize] = useResponsive();
  const setMenuVisible = _setMenuVisible as React.Dispatch<
    React.SetStateAction<boolean>
  >;
  const location = useLocation();

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="logo">
          <Link to={HOME_ROUTE}>
            <Avatar src={CryptoIcon} />
            <span className="logo-text">CryptoTech</span>
          </Link>
        </div>
        <Button
          ghost
          type="primary"
          className="menu-control-container"
          onClick={(e) => {
            e.stopPropagation();
            setMenuVisible(!isMenuVisible);
          }}
        >
          <MenuOutlined />
        </Button>
        {isMenuVisible && (
          <Menu
            className="navbar-menu"
            items={menuItems}
            defaultSelectedKeys={[HOME_ROUTE]}
            selectedKeys={[location.pathname]}
            mode={screenSize <= 1280 ? "vertical" : "horizontal"}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
