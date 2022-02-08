import { getProductCategories } from './controllers/getProductCategories'
import { getAllProducts } from './controllers/getAllProducts'
import { saveNewProduct } from './controllers/saveNewProduct'
import { updateProduct } from './controllers/updateProduct'
import { removeProduct } from './controllers/removeProduct'
import { changeFavoriteParam } from './controllers/changeFavoriteParam'
import { changePinnedParam } from './controllers/changePinnedParam'

export default {
  getProductCategories,
  getAllProducts,
  saveNewProduct,
  updateProduct,
  removeProduct,
  changeFavoriteParam,
  changePinnedParam,
}
