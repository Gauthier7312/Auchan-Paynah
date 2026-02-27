'use client'

import { parseAsStringLiteral, useQueryState } from 'nuqs'

export const STORE_TAB_PARAM = 'tab' as const
export const STORE_FILTER_PARAM = 'filter' as const
export const STORE_CAISSIER_FILTER_PARAM = 'caissierFilter' as const

export const STORE_TAB_VALUES = ['transactions', 'caissiers'] as const
export type StoreTabValue = (typeof STORE_TAB_VALUES)[number]

const storeTabParser = parseAsStringLiteral(STORE_TAB_VALUES).withDefault('transactions')

export function useStoreDetailTab() {
  return useQueryState(STORE_TAB_PARAM, storeTabParser)
}

export const STORE_FILTER_VALUES = ['tous', 'rendu-monnaie', 'paiement-courses'] as const
export type StoreFilterValue = (typeof STORE_FILTER_VALUES)[number]

const storeFilterParser = parseAsStringLiteral(STORE_FILTER_VALUES).withDefault('tous')

export function useStoreDetailFilter() {
  return useQueryState(STORE_FILTER_PARAM, storeFilterParser)
}

export const STORE_CAISSIER_FILTER_VALUES = ['tous', 'actif', 'bloque'] as const
export type StoreCaissierFilterValue = (typeof STORE_CAISSIER_FILTER_VALUES)[number]

const storeCaissierFilterParser = parseAsStringLiteral(STORE_CAISSIER_FILTER_VALUES).withDefault('tous')

export function useStoreCaissierFilter() {
  return useQueryState(STORE_CAISSIER_FILTER_PARAM, storeCaissierFilterParser)
}
