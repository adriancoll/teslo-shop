import { UIState } from './'

type UIActionType = { type: 'UI - ToggleMenu' } | { type: 'UI - toggle searchbar'}

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case 'UI - ToggleMenu':
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen
      }
    default:
      return state
  }
}
