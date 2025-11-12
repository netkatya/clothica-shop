'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import css from './CategoriesList.module.css';
import { categoriesArray } from '@/components/PopularCategories/PopularCategories';
import { fetchCategoriesClient } from '@/lib/api/clientApi';
import { Category } from '@/types/category';
import { mergeById } from '@/lib/utils';

import { useTranslate } from "@tolgee/react";

export default function CategoriesList() {
  const { t } = useTranslate(); // initialize translate

  const [showAll, setShowAll] = useState(false);
  const [columns, setColumns] = useState(1);
  const [maxVisible, setMaxVisible] = useState(4);
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const listRef = useRef<HTMLUListElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [categoriesData, setCategoriesData] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategoriesClient(1, 7);

        const extendedData = mergeById(
          data.data,
          categoriesArray.map(({ img, _id }) => ({
            _id,
            img,
          }))
        );
        setCategoriesData(extendedData);
      } catch {
        setCategoriesData([]);
      }
    };

    fetchData();
  }, []);

  // count of columns and visiable items for user
  useEffect(() => {
    const updateLayout = () => {
      const w = window.innerWidth;
      if (w >= 1440) {
        setColumns(3);
        setMaxVisible(6);
      } else if (w >= 768) {
        setColumns(2);
        setMaxVisible(4);
      } else {
        setColumns(1);
        setMaxVisible(4);
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  // calculating height for transition of list
  useEffect(() => {
    if (!listRef.current) return;

    const visibleCount = showAll ? categoriesData.length : maxVisible;
    const children = Array.from(listRef.current.children).slice(
      0,
      visibleCount
    ) as HTMLElement[];

    const rowHeights: number[] = [];
    for (let i = 0; i < children.length; i += columns) {
      const row = children.slice(i, i + columns);
      const rowHeight = Math.max(...row.map(li => li.offsetHeight));
      rowHeights.push(rowHeight);
    }

    const totalHeight =
      rowHeights.reduce((sum, h) => sum + h, 0) + (rowHeights.length - 1) * 32;
    setMaxHeight(totalHeight);
  }, [showAll, columns, maxVisible, categoriesData]);

  //smooth scroll of Categories section
  useEffect(() => {
    if (!sectionRef.current) return;

    const top = sectionRef.current.offsetTop;
    const bottom =
      sectionRef.current.offsetTop + sectionRef.current.offsetHeight;

    if (showAll) {
      window.scrollTo({
        top: bottom,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: top - 20,
        behavior: 'smooth',
      });
    }
  }, [showAll, maxHeight]);

  return (
    <section className={css.categoriesSection} ref={sectionRef}>
      <div className="container">
        <div className={css.containerWrapper}>
          
          <h2 className={css.title}>{t("categories")}</h2>

          <ul
            ref={listRef}
            className={css.list}
            style={{
              maxHeight: `${maxHeight}px`,
              overflow: 'hidden',
              transition: 'max-height 0.5s ease',
            }}
          >
            {categoriesData.map((item, index) => {
              const slug = item._id;
              const isVisible = showAll || index < maxVisible;

              return (
                <li
                  key={slug}
                  className={css.listItem}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.4s ease, transform 0.4s ease',
                  }}
                >
                  <Link href={`/categories/${slug}`} className={css.card}>
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={336}
                      height={223}
                      className={css.image}
                    />
                    <p className={css.name}>{item.name}</p>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={css.btnContainer}>
            <button
              className={css.moreBtn}
              onClick={() => setShowAll(prev => !prev)}
            >
              {showAll ? t("showLess") : t("showMore")}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
