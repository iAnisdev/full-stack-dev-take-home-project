<script>
// @ts-nocheck
	import { onMount } from 'svelte';
	import { scaleBand, scaleLinear } from 'd3-scale';
	import { select } from 'd3-selection';
	import { axisBottom, axisLeft } from 'd3-axis';
	import { max } from 'd3-array';
	import 'd3-transition'; 

	export let data;
	let svgContainer;

	const sortDataByHour = (data) => {
		return data.sort((a, b) => a.hour - b.hour);
	};

	const drawHeatmap = (sortedData, containerWidth, containerHeight) => {
		const margin = { top: 20, right: 20, bottom: 60, left: 60 };
		const width = containerWidth - margin.left - margin.right;
		const height = containerHeight - margin.top - margin.bottom;

		const svg = select(svgContainer)
			.attr('width', containerWidth)
			.attr('height', containerHeight)
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`);

		// Define scales
		const yScale = scaleBand()
			.domain(sortedData.map((d) => d.key))
			.range([0, height])
			.padding(0.1);

		const xScale = scaleBand()
			.domain(sortedData.map((d) => d.hour))
			.range([0, width])
			.padding(0.1);

		const colorScale = scaleLinear()
			.domain([0, max(sortedData, (d) => d.unique_visitors)])
			.range(['white', '#800020']);

		// Define tooltip
		const tooltip = select('body')
			.append('div')
			.attr('class', 'tooltip')
			.style('position', 'absolute')
			.style('padding', '0.5rem')
			.style('background', 'rgba(0, 0, 0, 0.7)')
			.style('color', 'white')
			.style('border-radius', '0.5rem')
			.style('pointer-events', 'none')
			.style('opacity', 0);

		// Draw heatmap
		svg
			.selectAll('.heatmap-rect')
			.data(sortedData)
			.enter()
			.append('rect')
			.attr('class', 'heatmap-rect')
			.attr('x', (d) => xScale(d.hour))
			.attr('y', (d) => yScale(d.key))
			.attr('width', xScale.bandwidth())
			.attr('height', yScale.bandwidth())
			.style('fill', (d) => colorScale(d.unique_visitors))
			.on('mouseover', (event, d) => {
				tooltip
					.style('opacity', 1)
					.html(`Country: ${d.key}<br>Hour: ${d.hour}<br>Unique Visitors: ${d.unique_visitors}`);
			})
			.on('mousemove', (event) => {
				tooltip.style('left', `${event.pageX + 10}px`).style('top', `${event.pageY - 30}px`);
			})
			.on('mouseout', () => {
				tooltip.style('opacity', 0);
			});

		// Add x-axis
		const xAxis = axisBottom(xScale);
		svg
			.append('g')
			.attr('class', 'x-axis')
			.attr('transform', `translate(0,${height})`)
			.call(xAxis)
			.append('text')
			.attr('class', 'axis-label')
			.attr('x', width / 2)
			.attr('y', margin.bottom - 20)
			.style('text-anchor', 'middle')
			.text('Hour');

		// Add y-axis
		const yAxis = axisLeft(yScale);
		svg
			.append('g')
			.attr('class', 'y-axis')
			.call(yAxis)
			.append('text')
			.attr('class', 'axis-label')
			.attr('transform', 'rotate(-90)')
			.attr('x', -height / 2)
			.attr('y', -margin.left + 20)
			.style('text-anchor', 'middle')
			.text('Country');
	};

	const drawResponsiveHeatmap = () => {
		select(svgContainer).selectAll('*').remove();

		const containerWidth = svgContainer.clientWidth;
		const containerHeight = svgContainer.clientHeight;

		const sortedData = sortDataByHour(data);
		drawHeatmap(sortedData, containerWidth, containerHeight);
	};

	onMount(() => {
		drawResponsiveHeatmap();
		window.addEventListener('resize', drawResponsiveHeatmap);

		return () => {
			window.removeEventListener('resize', drawResponsiveHeatmap);
		};
	});
</script>

<div class="w-full h-96 p-4">
	<svg bind:this={svgContainer} class="heatmap-container w-full h-full"></svg>
</div>