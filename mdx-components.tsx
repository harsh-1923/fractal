import React, { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { highlight } from "sugar-high";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

// Helper function to generate anchor ID from heading text
const generateAnchorId = (children: React.ReactNode): string => {
  const text = React.Children.toArray(children)
    .map(child => {
      if (typeof child === 'string') return child;
      if (typeof child === 'number') return child.toString();
      return '';
    })
    .join(' ');
  
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

const components = {
  h1: (props: HeadingProps) => {
    const anchorId = generateAnchorId(props.children);
    return (
      <h1
        className="font-medium pt-12 mb-0 group"
        {...props}
        data-heading
        id={anchorId}
      >
        <a
          href={`#${anchorId}`}
          className="no-underline hover:underline text-gray-800 dark:text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity ml-2"
          aria-label={`Link to ${
            typeof props.children === "string" ? props.children : "section"
          }`}
        >
          #
        </a>
        {props.children}
      </h1>
    );
  },
  h2: (props: HeadingProps) => {
    const anchorId = generateAnchorId(props.children);
    return (
      <h2
        className="text-gray-800 dark:text-zinc-200 font-medium mt-8 mb-3 group"
        {...props}
        id={anchorId}
      >
        <a
          href={`#${anchorId}`}
          className="no-underline hover:underline text-gray-800 dark:text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity mr-2"
          aria-label={`Link to ${
            typeof props.children === "string" ? props.children : "section"
          }`}
        >
          #
        </a>
        {props.children}
      </h2>
    );
  },
  h3: (props: HeadingProps) => {
    const anchorId = generateAnchorId(props.children);
    return (
      <h3
        className="text-gray-800 dark:text-zinc-200 font-medium mt-8 mb-3 group"
        data-subheading
        {...props}
        id={anchorId}
      >
        <a
          href={`#${anchorId}`}
          className="no-underline hover:underline text-gray-800 dark:text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity mr-2"
          aria-label={`Link to ${
            typeof props.children === "string" ? props.children : "section"
          }`}
        >
          #
        </a>
        {props.children}
      </h3>
    );
  },
  h4: (props: HeadingProps) => {
    const anchorId = generateAnchorId(props.children);
    return (
      <h4 className="font-medium group" {...props} id={anchorId}>
        <a
          href={`#${anchorId}`}
          className="no-underline hover:underline text-gray-800 dark:text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity mr-2"
          aria-label={`Link to ${
            typeof props.children === "string" ? props.children : "section"
          }`}
        >
          #
        </a>
        {props.children}
      </h4>
    );
  },
  p: (props: ParagraphProps) => (
    <p className="text-gray-800 dark:text-zinc-300 leading-snug" {...props} />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr className="border-[var(--colors-gray6)] my-10" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol
      className="text-gray-800 dark:text-zinc-300 list-decimal pl-5 space-y-2"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="text-gray-800 dark:text-zinc-300 list-disc pl-5 space-y-1"
      {...props}
    />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      "text-blue-500 hover:text-blue-700 dark:text-gray-400 hover:dark:text-gray-300 dark:underline dark:underline-offset-2 dark:decoration-gray-800";
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith("#")) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
    const codeHTML = highlight(children as string);
    return (
      <code
        className="text-sm"
        dangerouslySetInnerHTML={{ __html: codeHTML }}
        {...props}
      />
    );
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-l-3 border-gray-300 pl-4 text-gray-700 dark:border-zinc-600 dark:text-zinc-300"
      {...props}
    />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
