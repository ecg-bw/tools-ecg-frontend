export { cn } from "cn";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };


export const breakpoints_tailwind = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
};

//   const sm = breakpoint.lt("sm");
//   const sme = breakpoint.lte("sm");
//   const md = breakpoint.bn("sm", "md");
//   const lg = breakpoint.bn("md", "lg");
//   const xl = breakpoint.bn("lg", "xl");
//   const xxl = breakpoint.bn("xl", "2xl");
//   const xxxl = breakpoint["2xl"];