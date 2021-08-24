import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { StyledMenuItem } from "./styled";
import { roles } from "../../configs/roles";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../../stores/authSlice";
import { useSelector } from "react-redux";
import { checkObjEmpty } from "../../utils";

const { SubMenu } = Menu;
const MOCK_MODE = true

const MenuByRoles = (props) => {
  const currentUser = useSelector(getUser) || {};
  let { param } = useParams();

  const renderMenuItem = () => {
    let result;
    let items = roles[currentUser.roles || "staff"];
    result = items.map((item) => {
      if (item.submenu)
        return (
          <SubMenu key={item.key} title={item.name}>
            {item.submenu.map((submenu) => (
              <StyledMenuItem key={submenu.key}>
                <Link to={`${submenu.path}`}>
                  <span>{submenu.name}</span>
                </Link>
              </StyledMenuItem>
            ))}
          </SubMenu>
        );
      else
        return (
          <StyledMenuItem key={item.key}>
            <Link to={`${item.path}`}>
              <span>{item.name}</span>
            </Link>
          </StyledMenuItem>
        );
    });
    return result;
  };

  return (
    <Menu
      className="main__menu flex__center__center flex__column"
      theme="dark"
      selectedKeys={param || "dashboard"}
      mode="inline"
    >
      {!MOCK_MODE && checkObjEmpty(currentUser) && renderMenuItem()}
      {MOCK_MODE && renderMenuItem()}
    </Menu>
  );
};

export default MenuByRoles;
