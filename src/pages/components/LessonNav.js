import React from 'react';
import { AppstoreOutlined, LogoutOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';

import lessonsList from './common/lessons';

const LessonNav = ({setValues, days}) => {
  const navigate = useNavigate();
  
  const getItem = (label, key, icon, children, type) => {
      return {
          key,
          icon,
          children,
          label,
          type,
      };
  }
  
  const items = lessonsList.filter(les => les.day <= days || les.id === "logout" || les.id === "pmb").map(
    les => getItem(
      les.lesson, les.id, les.id === "logout" ? <LogoutOutlined /> : les.id === "pmb" ? <DollarCircleOutlined /> : <AppstoreOutlined />,
      les.id === "logout" ? null : les.id === "pmb" ? null : les.videos.map(vid => getItem(vid.title, vid.id))
    )
  )

  const handleNavigate = (value) => {
    if (value.key === "logout") {
      localStorage.removeItem("user");
      navigate("/");
    } else if (value.key === "pmb") {
      navigate("/pmb");
    } else {
      const getLesson = lessonsList.filter(les => les.id === value.keyPath[1]);
      const getTheVideo = getLesson[0].videos.filter(vid => vid.id === value.keyPath[0]);
      const { title, vimeoId } = getTheVideo[0];
      setValues({ title, vimeoId });
    }
  }
    
  return ( 
    <div style={{ width: isMobile ? "100%" : 350}}>
      <Menu
        defaultSelectedKeys={['les0-vid1']}
        defaultOpenKeys={['les0', 'les1', 'les2', 'les3', 'les4', 'les5']}
        mode="inline"
        theme="dark"
        inlineCollapsed={false}
        items={items}
        onClick={(value) => handleNavigate(value)}
      />
    </div>
  );
}
 
export default LessonNav;