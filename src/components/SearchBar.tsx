import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { FC } from "react";

export interface SearchBarProps {
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  placeholder: string | undefined;
}

const SearchBar: FC<SearchBarProps> = ({ onChange, placeholder }) => {
  return (
    <div className="search-container">
      <Input
        className="search-bar"
        suffix={<SearchOutlined />}
        placeholder={placeholder}
        size="large"
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
