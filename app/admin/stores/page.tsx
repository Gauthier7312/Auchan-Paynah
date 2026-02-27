"use client";

import { useState } from "react";
import StoreCard from "@/components/store-card";
import { SearchInput } from "@/components/ui/search-input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import SvgColor from "@/components/svg-color";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const TOTAL_PAGES = 4;

export default function StoresPage() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section className="w-full max-w-[1370px] mx-auto px-4 sm:px-6 lg:px-0 pt-8 sm:pt-12 lg:pt-18">
      <div className="flex flex-col gap-6 sm:gap-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-center">
          <h1 className="font-sana-sans-bold text-2xl sm:text-[28px] lg:text-[36px] text-black shrink-0">
            Magasins
          </h1>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6 min-w-0">
            <SearchInput placeholder="Nom du magasin, code magasin, Commune" wrapperClassName="w-full sm:min-w-[200px]" />
            <Select
              name="commune"
              id="commune"
              value="commune"
              options={[
                { value: 'commune', label: 'commune' },
                { value: 'Pays', label: 'Pays' },
              ]}
              triggerClassName="w-full sm:w-[211px] h-[36px] bg-[#E6E6E6] text-[#949494] text-[15px]"
            />
          </div>
        </div>

        <div className="shrink-0">
          <Button
            variant="primary"
            size="large"
            className="h-[46px] sm:h-[50px] w-full sm:w-auto flex items-center justify-center rounded-[10px] text-base sm:text-[18px]"
          >
            <SvgColor src="/assets/icons/ic_plus.svg" className="w-4 h-4 text-white mr-1.5" />
            <span className="font-sana-sans-bold text-base sm:text-[18px] text-white">Ajouter un magasin</span>
          </Button>
        </div>
      </div>

      <div className="mt-6 sm:mt-7.5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-7.5">
        {Array.from({ length: 15 }).map((_, index) => (
          <StoreCard key={index} id={String(index + 1)} />
        ))}
      </div>

      <div className="mt-18 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                href="#"
                size="default"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((p) => Math.max(1, p - 1));
                }}
                aria-disabled={currentPage <= 1}
                className="bg-transparent hover:bg-transparent p-0"
              >
                <SvgColor src="/assets/icons/ic_arrow_left.svg" className={
                  cn('w-5 h-5',
                    currentPage <= 1 ? "text-[#D9D9D9]" : "text-primary")
                }
                />
              </PaginationLink>
            </PaginationItem>
            {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }}
                  isActive={currentPage === page}
                  size="icon"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationLink
                href="#"
                size="default"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1));
                }}
                aria-disabled={currentPage >= TOTAL_PAGES}
                className="bg-transparent hover:bg-transparent p-0"
              >
                <SvgColor src="/assets/icons/ic_arrow_right.svg" className={
                  cn('w-5 h-5',
                    currentPage >= TOTAL_PAGES ? "text-[#D9D9D9]" : "text-primary")
                }
                />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  )
}

