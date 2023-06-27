import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

function CancionesRegistros({
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

          {/* campo Nombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Nombre">
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Nombre", {
                  required: { value: true, message: "Nombre es requerido" },
                  minLength: {
                    value: 2,
                    message: "Nombre debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 60,
                    message: "Nombre debe tener como máximo 60 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Nombre ? "is-invalid" : "")
                }
              />
              {errors?.Nombre && touchedFields.Nombre && (
                <div className="invalid-feedback">
                  {errors?.Nombre?.message}
                </div>
              )}
            </div>
        </div>

        {/* campo Artista */}
        <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Artista">
                Artista<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Artista", {
                  required: { value: true, message: "Artista es requerido" },
                  minLength: {
                    value: 2,
                    message: "Artista debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 40,
                    message: "Artista debe tener como máximo 40 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Artista ? "is-invalid" : "")
                }
              />
              {errors?.Artista && touchedFields.Artista && (
                <div className="invalid-feedback">
                  {errors?.Artista?.message}
                </div>
              )}
            </div>
        </div>

        {/* campo Duracion */}
        <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Duracion">
                Duración<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number" step="1"
                {...register("Duracion", {
                  required: { value: true, message: "Duracion es requerida" },
                  min: {
                    value: 1,
                    message: "La duracion de la cancion no puede ser menor que 1",
                  },
                  max: {
                    value: 32767,
                    message: "La duracion de la cancion no puede ser mayor a 32767",
                  },
                })}
                className={
                  "form-control " + (errors?.Duracion ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.Duracion?.message}</div>
            </div>
          </div>

        {/* campo FechaLanzamiento */}
        <div className="row">
                    <div className="col-sm-4 col-md-3 offset-md-1">
                    <label className="col-form-label" htmlFor="FechaLanzamiento">
                        Fecha Lanzamiento<span className="text-danger">*</span>:
                    </label>
                    </div>
                    <div className="col-sm-8 col-md-6">
                    <input
                        type="date"
                        {...register("FechaLanzamiento", {
                        required: { value: true, message: "Fecha Lanzamiento es requerida" }
                        })}
                        className={
                        "form-control " + (errors?.FechaLanzamiento ? "is-invalid" : "")
                        }
                    />
                    <div className="invalid-feedback">
                        {errors?.FechaLanzamiento?.message}
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

export default CancionesRegistros;
