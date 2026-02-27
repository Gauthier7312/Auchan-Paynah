import OverallBalanceCadre from "@/sections/dashboard/overall-balance-cadre"
import RecentTransactions from "@/sections/dashboard/recent-transactions"
import StatisticsCard from "@/sections/dashboard/statistics-card"
import TopStoresSection from "@/sections/dashboard/top-stores-section"

function DashboardPage() {
    return (
        <section className="w-full max-w-[1370px] mx-auto pt-8 sm:pt-10 lg:pt-10.5 px-4 sm:px-6 lg:px-1 flex flex-col gap-5 sm:gap-6">
            <div className="w-full grid grid-cols-1 md:grid-cols-[354px_1fr] gap-4 sm:gap-5.5">
                <div className="min-w-0 md:min-w-[354px]">
                    <OverallBalanceCadre />
                </div>

                <div className="min-w-0 md:min-w-[250px]">
                    <TopStoresSection />
                </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_414px] gap-4 sm:gap-5.5">
                <RecentTransactions />
                <StatisticsCard />
            </div>
        </section>
    )
}

export default DashboardPage
