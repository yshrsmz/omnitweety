import { inject, provide } from '@vue/composition-api'
import { Store } from 'vuex'
import { RootState } from '.'

export const STORE_KEY = 'vuex-store'

export const provideStore = (store: Store<unknown>): void => {
  provide(STORE_KEY, store)
}

export const useStore = (): Store<RootState> => {
  return inject(STORE_KEY)
}
