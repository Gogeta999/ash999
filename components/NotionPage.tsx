import * as types from "../@types/types";
import {
  NotionRenderer,
  Code,
  Collection,
  CollectionRow,
} from "react-notion-x";
import dynamic from "next/dynamic";
import { Tweet } from "react-static-tweets";
import Link from "next/link";

export const NotionPage: React.FC<types.NotionPageProps> = ({ recordMap }) => {
  const Modal = dynamic(
    // @ts-ignore
    () => import("react-notion-x").then((notion) => notion.Modal),
    { ssr: false }
  );

  const Equation = dynamic(
    // @ts-ignore
    () => import("react-notion-x").then((notion) => notion.Equation)
  );

  return (
    <div className="flex flex-col h-full w-full z-10 dark-mode:bg-black-500">
      <NotionRenderer
        components={{
          pageLink: ({
            // @ts-ignore
            href,
            // @ts-ignore
            as,
            // @ts-ignore
            passHref,
            // @ts-ignore
            prefetch,
            // @ts-ignore
            replace,
            // @ts-ignore
            scroll,
            // @ts-ignore
            shallow,
            // @ts-ignore
            locale,
            ...props
          }) => (
            <Link
              href={href}
              as={as}
              passHref={passHref}
              prefetch={prefetch}
              replace={replace}
              scroll={scroll}
              shallow={shallow}
              locale={locale}
            >
              <a {...props} />
            </Link>
          ),
          code: Code,
          collection: Collection,
          collectionRow: CollectionRow,
          tweet: Tweet,
          modal: Modal,
          equation: Equation,
        }}
        recordMap={recordMap}
        fullPage={true}
        // darkMode={darkMode.value}
        showTableOfContents={true}
        minTableOfContentsItems={3}
      />
    </div>
  );
};
