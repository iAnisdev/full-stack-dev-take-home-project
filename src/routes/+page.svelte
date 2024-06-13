<script lang="ts">
	interface DateRange {
		start: Date;
		end: Date;
	}

	interface PickerOption {
		label: string;
		key: string;
		value: DateRange;
	}

	let datePickerOptions: PickerOption[] = [
		{
			label: 'Last week',
			key: 'last_week',
			value: {
				start: new Date(new Date().setDate(new Date().getDate() - 7)),
				end: new Date()
			}
		},
		{
			label: 'Last two weeks',
			key: 'last_two_weeks',
			value: {
				start: new Date(new Date().setDate(new Date().getDate() - 14)),
				end: new Date()
			}
		},
		{
			label: 'Last month',
			key: 'last_month',
			value: {
				start: new Date(new Date().setDate(new Date().getDate() - 30)),
				end: new Date()
			}
		},
		{
			label: 'Last quarter',
			key: 'last_quarter',
			value: {
				start: new Date(new Date().setMonth(new Date().getMonth() - 4)),
				end: new Date()
			}
		},
		{
			label: 'Last year',
			key: 'last_year',
			value: {
				start: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
				end: new Date()
			}
		}
	];

	let selectedDateRange: string = datePickerOptions[0].key;

	function handleDateChange(e: Event) {
		const target = e.target as HTMLSelectElement;
		const selectedOption = datePickerOptions.find((option) => option.key === target.value);
		selectedDateRange = selectedOption?.key || '';
	}
</script>

<main class="py-4 h-full w-full bg-[#F4F4F4]">
	<div class="flex flex-wrap justify-start items-center mx-auto max-w-screen-xl py-8">
		<div class="flex justify-between w-full py-8">
			<div>
				<p class="text-black text-2xl font-semibold">Web Traffics</p>
			</div>
			<div>
				<select
					id="large"
					class="block w-full px-2 py-2 text-base text-gray-900 border divide-y divide-gray-100 border-gray-300 rounded-lg"
					bind:value={selectedDateRange}
					on:change={handleDateChange}
				>
					{#each datePickerOptions as option}
						<option value={option.key}>Show me {option.label}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>
</main>
