import { fetchExercisePageInfo } from './controllers/fetchExercisePageInfo'
import { fetchExercisesList } from './controllers/fetchExercisesList'
import { fetchExercisesListByMuscles } from './controllers/fetchExercisesListByMuscles'
import { fetchExerciseInfo } from './controllers/fetchExerciseInfo'
import { saveNewExercise } from './controllers/saveNewExercise'
import { updateExercise } from './controllers/updateExercise'
import { changePinnedParam } from './controllers/changePinnedParam'
import { changeFavoriteParam } from './controllers/changeFavoriteParam'
import { fetchMuscles } from './controllers/fetchMuscles'
import { fetchExerciseTypes } from './controllers/fetchExerciseTypes'
import { fetchExerciseSorts } from './controllers/fetchExerciseSorts'
import { fetchExerciseExertions } from './controllers/fetchExerciseExertions'
import { fetchExerciseEquipments } from './controllers/fetchExerciseEquipments'

export default {
  fetchExercisePageInfo,
  fetchExercisesList,
  fetchExercisesListByMuscles,
  fetchExerciseInfo,
  saveNewExercise,
  updateExercise,
  changePinnedParam,
  changeFavoriteParam,
  fetchMuscles,
  fetchExerciseTypes,
  fetchExerciseSorts,
  fetchExerciseExertions,
  fetchExerciseEquipments
}
