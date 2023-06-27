import React from "react";
import { useForm } from "react-hook-form";

function PeliculasRegistros({
  AccionABMC,
  Item,
  Grabar,
  Volver,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: Item });

  const onSubmit = (data) => {
    Grabar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">

        <fieldset disabled={AccionABMC === "C"}>

          {/* campo nombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="nombre">
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("nombre", {
                  required: { value: true, message: "Nombre es requerido" },
                  minLength: {
                    value: 4,
                    message: "Nombre debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 50,
                    message: "Nombre debe tener como máximo 50 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.nombre ? "is-invalid" : "")
                }
              />
              {errors?.nombre && touchedFields.nombre && (
                <div className="invalid-feedback">
                  {errors?.nombre?.message}
                </div>
              )}
            </div>
        </div>

                  {/* campo director */}
                  <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="director">
                Director<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("director", {
                  required: { value: true, message: "Director es requerido" },
                  minLength: {
                    value: 4,
                    message: "Director debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 50,
                    message: "Director debe tener como máximo 50 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.nombre ? "is-invalid" : "")
                }
              />
              {errors?.director && touchedFields.director && (
                <div className="invalid-feedback">
                  {errors?.director?.message}
                </div>
              )}
            </div>
        </div>

          {/* campo duracion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="duracion">
                Duración<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number" step=".01"
                {...register("duracion", {
                  required: { value: true, message: "Duración es requerido" },
                  min: {
                    value: 1.00,
                    message: "Duración debe ser mayor a 1",
                  },
                  max: {
                    value: 99999999.00,
                    message: "Duración debe ser menor o igual a 99999999",
                  },
                })}
                className={
                  "form-control " + (errors?.duracion ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.duracion?.message}</div>
            </div>
          </div>
        {/* campo fechaLanzamiento */}
        <div className="row">
                    <div className="col-sm-4 col-md-3 offset-md-1">
                    <label className="col-form-label" htmlFor="fechaLanzamiento">
                        Fecha Lanzamiento<span className="text-danger">*</span>:
                    </label>
                    </div>
                    <div className="col-sm-8 col-md-6">
                    <input
                        type="date"
                        {...register("fechaLanzamiento", {
                        required: { value: true, message: "Fecha Lanzamiento es requerido" }
                        })}
                        className={
                        "form-control " + (errors?.fechaLanzamiento ? "is-invalid" : "")
                        }
                    />
                    <div className="invalid-feedback">
                        {errors?.fechaLanzamiento?.message}
                    </div>
                    </div>
                </div>
        </fieldset>

        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>

        {/* texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && (
          <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
          </div>
        )}

      </div>
    </form>
  );
}

export default PeliculasRegistros;
