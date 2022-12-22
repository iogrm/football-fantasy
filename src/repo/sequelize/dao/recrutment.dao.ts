import Recrutment from "../model/recrutment.model";

export default abstract class RecrutmentDao {
  static convert = (model: Recrutment): RecrutmentOutputType => {
    return model.toJSON();
  };

  static convertMany = (models: Recrutment[]): RecrutmentOutputType[] => {
    return models.map((model) => this.convert(model));
  };
}
