import { fetchPageInfo } from './controllers/fetchPageInfo'
import { fetchProductCategories } from './controllers/fetchProductCategories'
import { fetchProductsList } from './controllers/fetchProductsList'
import { saveNewProduct } from './controllers/saveNewProduct'
import { updateProduct } from './controllers/updateProduct'
import { removeProduct } from './controllers/removeProduct'
import { changeFavoriteParam } from './controllers/changeFavoriteParam'
import { changePinnedParam } from './controllers/changePinnedParam'

export default {
  fetchPageInfo,
  fetchProductCategories,
  fetchProductsList,
  saveNewProduct,
  updateProduct,
  removeProduct,
  changeFavoriteParam,
  changePinnedParam,
}
