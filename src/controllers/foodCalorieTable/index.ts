import { getProductCategories } from './controllers/getProductCategories'
import { fetchProductsList } from './controllers/fetchProductsList'
import { saveNewProduct } from './controllers/saveNewProduct'
import { updateProduct } from './controllers/updateProduct'
import { removeProduct } from './controllers/removeProduct'
import { changeFavoriteParam } from './controllers/changeFavoriteParam'
import { changePinnedParam } from './controllers/changePinnedParam'

export default {
  getProductCategories,
  fetchProductsList,
  saveNewProduct,
  updateProduct,
  removeProduct,
  changeFavoriteParam,
  changePinnedParam,
}
