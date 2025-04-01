import React, { useState } from "react";
import { useRegisterFormStore, baseRegisterFormSchema } from "../../registerFormStore";
import { Button } from "@/shared/components/ui/button";
import { CombinedOnboardingViews } from "../../types";
import { useViewTransition } from "@/shared/providers/viewTransitionProvider";
import { Gender, GenderType } from "@/shared/lib/types";
import RenderList from "@/shared/components/utils/renderList";
import { genderEnumToFullWord } from "@/shared/lib/utils";

const registerGenderSchema = baseRegisterFormSchema.pick({
	gender: true,
});

export default function SignUpGenderForm() {
	const { viewSwitcherNavigate } = useViewTransition<CombinedOnboardingViews>();
	const { formData, updateField } = useRegisterFormStore();

	const [gender, setGender] = useState<GenderType | null>(formData.gender);
	const [isValid, setIsValid] = useState<boolean>(false);

	const switchGender = (gend: GenderType | null) => {
		setGender(gend);
		updateField({ gender: gend });
		setIsValid(gend !== null);
	};

	const genderList: GenderType[] = Object.values(Gender).flat();

	return (
		<div className="flex flex-col h-full justify-between">
			<div className="flex flex-row flex-wrap gap-2">
				<RenderList
					data={genderList}
					render={(gender: GenderType, i: number) => (
						<Button
							variant={gender === formData.gender ? "accent" : "outline"}
							rounded="full"
							key={i}
							onClick={() => switchGender(gender)}
						>
							{genderEnumToFullWord(gender)}
						</Button>
					)}
				/>
			</div>
			<div className="flex w-full justify-center">
				<Button
					size="lg"
					rounded="full"
					variant="accent"
					disabled={!isValid}
					onClick={() => viewSwitcherNavigate(CombinedOnboardingViews.registerDOBForm)}
				>
					Next
				</Button>
			</div>
		</div>
	);
}
