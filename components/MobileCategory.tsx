import Link from "next/link";
import React from "react";
import * as types from "../@types/types";

export const MobileCat: React.FC<types.CategoriesProps> = ({
  catData,
  onSubmit,
}) => {
  return (
    <>
      <div className="flex flex-col h-5/6 overflow-y-auto m-2 divide-y">
        {catData?.allCategories.map((category) => (
          <button
            key={category.id}
            className="hover:bg-black py-4 text-2xl"
            onClick={onSubmit}
          >
            <Link
              href={{
                pathname: `/${category.notionId}`,
                query: {
                  pageId: category.notionId,
                  pageName: category.name,
                },
              }}
            >
              {category.name}
            </Link>
          </button>
        ))}
      </div>
    </>
  );
};
