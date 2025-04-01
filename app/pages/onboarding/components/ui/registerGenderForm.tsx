import React, { useState } from "react";
import { useRegisterFormStore } from "../../registerFormStore";
import { Button } from "@/shared/components/ui/button";
import { CombinedOnboardingViews } from "../../types";
import { useViewTransition } from "@/shared/providers/viewTransitionProvider";
import { Gender, GenderType } from "@/shared/lib/types";
import RenderList from "@/shared/components/utils/renderList";
import { genderEnumToFullWord } from "@/shared/lib/utils";
import OnboaridngViewContainer from "./onboardingViewContainer";

export default function RegisterGenderForm() {
	const { viewSwitcherNavigate } = useViewTransition<CombinedOnboardingViews>();
	const { formData, updateField } = useRegisterFormStore();

	const [isValid, setIsValid] = useState<boolean>(formData.gender !== null);

	const switchGender = (gender: GenderType | null) => {
		updateField({ gender: gender });
		setIsValid(gender !== null);
	};

	const genderList: GenderType[] = Object.values(Gender).flat();

	return (
		<OnboaridngViewContainer className="justify-start gap-4">
			<div className="flex flex-col gap-2 mt-12">
				<h1 className="text-2xl font-semibold">Choose Gender</h1>
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
		</OnboaridngViewContainer>
	);
}
