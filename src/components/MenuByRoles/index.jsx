import React, { useEffect, useState } from "react";
import { Button, Menu } from "antd";
import { StyledMenuItem } from "./styled";
import { roles } from "../../configs/roles";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../../stores/authSlice";
import { useSelector } from "react-redux";
import { checkObjEmpty } from "../../utils";

const { SubMenu } = Menu;

const MenuByRoles = (props) => {
  const currentUser = useSelector(getUser) || {};
  let { param } = useParams();

  const renderMenuItem = () => {
    let result;
    let items = roles[currentUser.authorities && currentUser.authorities[0]];
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
            <Button size="large" block>
              <Link to={`${item.path}`}>
                <span>{item.name}</span>
              </Link>
            </Button>
          </StyledMenuItem>
        );
    });
    return result;
  };

  return (
    <Menu className="main__menu flex__center__center flex__column" theme="dark" selectedKeys={param || "dashboard"} mode="inline">
      {checkObjEmpty(currentUser) && renderMenuItem()}
    </Menu>
  );
};

export default MenuByRoles;
