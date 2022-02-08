import { fetchExercisesList } from './controllers/fetchExercisesList'
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
  fetchExercisesList,
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
