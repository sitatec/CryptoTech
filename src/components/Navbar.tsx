import { FC } from "react";
import { Avatar, Menu, Typography } from "antd";
import { Link } from "react-router-dom";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import CryptoIcon from "../images/cryptocurrency.png";
import {
  HomeOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
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
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Typography.Title level={2} className="logo">
          <Link to="/">
            <Avatar src={CryptoIcon} size="large" />
            <span className='logo-text'>Crypto</span>
          </Link>
        </Typography.Title>
      </div>
      <Menu theme="dark" items={menuItems} defaultSelectedKeys={['home']}/>
    </div>
  );
};

export default Navbar;
