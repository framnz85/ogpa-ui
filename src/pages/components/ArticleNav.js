import React, { useEffect } from 'react';
import { Menu } from 'antd';
import { isMobile } from 'react-device-detect';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import articlesList from './common/articles';

const ArticleNav = ({ setValues }) => {
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      const getArticle = articlesList.filter(les => les.slug === slug);
      if (getArticle.length > 0) {
        const { lesson, article } = getArticle[0];
        setValues({ lesson, article });
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  const getItem = (label, key, icon, children, type) => {
      return {
          key,
          icon,
          children,
          label,
          type,
      };
  }
  
  const items = articlesList.map(
    les => getItem(
      les.lesson, les.id, les.icon, null
    )
  )

  const handleNavigate = (value) => {
    const getArticle = articlesList.filter(les => les.id === value.keyPath[0]);
    const { lesson, article, slug } = getArticle[0];
    navigate(`../../article/${slug}`);
    setValues({ lesson, article });
  }
    
  return ( 
    <div style={{ width: isMobile ? "100%" : 350}}>
      <Menu
        mode="inline"
        theme="dark"
        inlineCollapsed={false}
        items={items}
        onClick={(value) => handleNavigate(value)}
      />
    </div>
  );
}
 
export default ArticleNav;