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
    <section className='max-w-[1370px] mx-auto pt-18'>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-7.5">
          <h1 className='font-sana-sans-bold text-[36px] text-[#000000]'>Magasins</h1>

          <div className="flex items-center gap-6">

            <SearchInput placeholder="Nom du magasin, code magasin, Commune" />
            <Select
              name="commune"
              id="commune"
              value="commune"
              options={[
                { value: 'commune', label: 'commune' },
                { value: 'Pays', label: 'Pays' },
              ]}
              triggerClassName="w-[211px] h-[36px] bg-[#E6E6E6] text-[#949494] text-[15px]"
            />
          </div>
        </div>

        <div>
          <Button
            variant="primary"
            size="large"
            className="h-[50px] flex items-center justify-center rounded-[10px]"
          >
            <SvgColor src="/assets/icons/ic_plus.svg" className="w-4 h-4 text-white mr-1.5" />
            <span className="font-sana-sans-bold text-[18px] text-white">Ajouter un magasin</span>
          </Button>
        </div>
      </div>

      <div className="mt-7.5 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-7.5">
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

