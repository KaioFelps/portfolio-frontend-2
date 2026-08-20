import Link from "next/link";

type Props = {
  page: number;
  getHref: (page: number) => string;
  isActive: boolean;
};

export function PaginationItem({ page, getHref, isActive }: Props) {
  return (
    <Link
      key={`project_listing_pagination_to_${page}`}
      data-state={isActive ? "active" : "deactive"}
      href={getHref(page)}
      className="py-3.5 px-[17.5px] leading-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 active:bg-white/15 data-[state=active]:bg-d-backgrond/50 data-[state=active]:cursor-default transition-all duration-100 will-change-[color]"
    >
      {page}
    </Link>
  );
}
