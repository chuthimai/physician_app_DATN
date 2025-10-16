import type Specimen from "@/features/lab_get_specimens/types/Specimen.ts";
import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import SelectSearchInput from "@/components/input/SelectSearchInput.tsx";
import {
    specimenConditionOptions,
    specimenStatusOptions,
    specimenTypeOptions
} from "@/constants/lab_get_specimens/options.ts";
import ButtonSave from "@/components/button/ButtonSave.tsx";
import {useToast} from "@/hooks/useToast.ts";
import {useState} from "react";
import ButtonEdit from "@/components/button/ButtonEdit.tsx";

type SpecimenViewProps = {
    specimen: Specimen,
}

type SpecimenInputs = {
    type: string;
    condition: string;
    status: string;
};

export default function SpecimenView({specimen}: SpecimenViewProps) {
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SpecimenInputs>();

    const {showToastSuccess} = useToast();
    const [isEditing, setIsEditing] = useState(false);

    const onSubmit: SubmitHandler<SpecimenInputs> = async (data) => {
        console.log("Submitting...", data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        showToastSuccess("Submitted!")
        setIsEditing(false);
    };

    return (
      <div className="flex flex-col gap-4 border border-gray-300 rounded-md py-4 px-12 my-2 bg-gray-100">
          <h3 className="font-bold mb-1">Mẫu số {specimen.identifier}</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex gap-4 items-center">
                  <div className="flex-1">
                      <Controller
                          control={control}
                          name="type"
                          rules={{ required: "Vui lòng chọn loại mẫu xét nghiệm" }}
                          defaultValue={specimen.type}
                          render={({ field }) => (
                              <SelectSearchInput
                                  label="Loại mẫu xét nghiệm"
                                  value={specimenTypeOptions.find((opt) => opt.value === field.value)}
                                  onChange={(selected) => field.onChange(selected?.value ?? "")}
                                  options={specimenTypeOptions}
                                  error={errors.type}
                                  disabled={!isEditing}
                              />
                          )}
                      />
                  </div>

                  <div className="flex-1">
                      <Controller
                          control={control}
                          name="condition"
                          rules={{ required: "Vui lòng chọn điều kiện hiện tại của mẫu" }}
                          defaultValue={specimen.condition}
                          render={({ field }) => (
                              <SelectSearchInput
                                  label="Điều kiện hiện tại"
                                  value={specimenConditionOptions.find((opt) => opt.value === field.value)}
                                  onChange={(selected) => field.onChange(selected?.value ?? "")}
                                  options={specimenConditionOptions}
                                  error={errors.condition}
                                  disabled={!isEditing}
                              />
                          )}
                      />
                  </div>

                  <div className="flex-1">
                      <Controller
                          control={control}
                          name="status"
                          rules={{ required: "Vui lòng chọn tình trạng hiện tại của mẫu" }}
                          defaultValue={specimen.status}
                          render={({ field }) => (
                              <SelectSearchInput
                                  label="Tình trạng hiện tại"
                                  value={specimenStatusOptions.find((opt) => opt.value === field.value)}
                                  onChange={(selected) => field.onChange(selected?.value ?? "")}
                                  options={specimenStatusOptions}
                                  error={errors.status}
                                  disabled={!isEditing}
                              />
                          )}
                      />
                  </div>

                  <div className="">
                      {isEditing ?
                          <ButtonSave
                          label={"Lưu"}
                          className={"w-full"}
                          isSubmitting={isSubmitting}
                          /> :
                          <ButtonEdit
                              className={"w-full"}
                              onClick={() => setIsEditing(true)}
                          />
                      }
                  </div>
              </div>
          </form>
      </div>
    );
}