<script lang="ts">
	const SLIDE_TIME = 400;

	let { days, hours, minutes, seconds } = getTimeUntil();

	let slideDays = false;
	let slideHours = false;
	let slideMinutes = false;
	let slideSeconds = false;

	function formatDays(days: number) {
		return days.toString().padStart(3, '0');
	}

	function formatHours(num: number) {
		if (num < 0) num += 24;
		if (num >= 24) num %= 24;
		return num.toString().padStart(2, '0');
	}

	function formatMinutesOrSeconds(num: number) {
		if (num < 0) num += 60;
		if (num >= 60) num %= 60;

		return num.toString().padStart(2, '0');
	}

	function getTimeUntil(): { days: number; hours: number; minutes: number; seconds: number } {
		// Time until Feb 5, 2023
		const then = new Date('February 5, 2023 22:12:40').getTime();

		const now = new Date().getTime();
		const diff = then - now;

		let days = Math.floor(diff / (1000 * 60 * 60 * 24));
		let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((diff % (1000 * 60)) / 1000);

		return {
			days,
			hours,
			minutes,
			seconds
		};
	}

	setInterval(() => {
		const timeUntil = getTimeUntil();

		if (timeUntil.seconds !== seconds && !slideSeconds) {
			slideSeconds = true;
			setTimeout(() => {
				slideSeconds = false;
				seconds = timeUntil.seconds;
			}, SLIDE_TIME);
		}

		if (timeUntil.minutes !== minutes && !slideMinutes) {
			slideMinutes = true;
			setTimeout(() => {
				slideMinutes = false;
				minutes = timeUntil.minutes;
			}, SLIDE_TIME);
		}

		if (timeUntil.hours !== hours && !slideHours) {
			slideHours = true;
			setTimeout(() => {
				slideHours = false;
				hours = timeUntil.hours;
			}, SLIDE_TIME);
		}

		if (timeUntil.days !== days && !slideDays) {
			slideDays = true;
			setTimeout(() => {
				slideDays = false;
				days = timeUntil.days;
			}, SLIDE_TIME);
		}
	}, 200);
</script>

<div class="clock-wrapper">
	<div class="clock">
		<div class="inactive">
			<div class="days col" class:slide={slideDays}>
				<div class="row">{formatDays(days - 1)}</div>
				<div class="row">{formatDays(days)}</div>
				<div class="row">{formatDays(days + 1)}</div>
				<div class="row">{formatDays(days + 2)}</div>
				<div class="row">{formatDays(days + 3)}</div>
				<div class="row">{formatDays(days + 4)}</div>
			</div>
			<div class="hours col" class:slide={slideHours}>
				<div class="row">{formatHours(hours - 3)}</div>
				<div class="row">{formatHours(hours - 2)}</div>
				<div class="row">{formatHours(hours - 1)}</div>
				<div class="row">{formatHours(hours)}</div>
				<div class="row">{formatHours(hours + 1)}</div>
				<div class="row">{formatHours(hours + 2)}</div>
			</div>
			<div class="minutes col" class:slide={slideMinutes}>
				<div class="row">{formatMinutesOrSeconds(minutes - 4)}</div>
				<div class="row">{formatMinutesOrSeconds(minutes - 3)}</div>
				<div class="row">{formatMinutesOrSeconds(minutes - 2)}</div>
				<div class="row">{formatMinutesOrSeconds(minutes - 1)}</div>
				<div class="row">{formatMinutesOrSeconds(minutes)}</div>
				<div class="row">{formatMinutesOrSeconds(minutes + 1)}</div>
			</div>
			<div class="seconds col" class:slide={slideSeconds}>
				<div class="row">{formatMinutesOrSeconds(seconds - 2)}</div>
				<div class="row">{formatMinutesOrSeconds(seconds - 1)}</div>
				<div class="row">{formatMinutesOrSeconds(seconds)}</div>
				<div class="row">{formatMinutesOrSeconds(seconds + 1)}</div>
				<div class="row">{formatMinutesOrSeconds(seconds + 2)}</div>
				<div class="row">{formatMinutesOrSeconds(seconds + 3)}</div>
			</div>
		</div>
		<div class="active">
			<div class="days col" class:slide={slideDays}>
				<div class="row">{formatDays(days - 1)}</div>
				<div class="row">{formatDays(days)}</div>
				<div class="row empty">&nbsp;</div>
				<div class="row empty">&nbsp;</div>
				<div class="row empty">&nbsp;</div>
				<div class="row empty">&nbsp;</div>
			</div>
			<div class="hours col" class:slide={slideHours}>
				<div class="row empty">&nbsp;</div>
				<div class="row empty">&nbsp;</div>
				<div class="row">{formatHours(hours - 1)}</div>
				<div class="row">{formatHours(hours)}</div>
				<div class="row empty">&nbsp;</div>
				<div class="row empty">&nbsp;</div>
			</div>
			<div class="minutes col" class:slide={slideMinutes}>
				<div class="row empty">&nbsp;</div>
				<div class="row empty">&nbsp;</div>
				<div class="row empty">&nbsp;</div>
				<div class="row">{formatMinutesOrSeconds(minutes - 1)}</div>
				<div class="row">{formatMinutesOrSeconds(minutes)}</div>
				<div class="row empty">&nbsp;</div>
			</div>
			<div class="seconds col" class:slide={slideSeconds}>
				<div class="row empty">&nbsp;</div>
				<div class="row">{formatMinutesOrSeconds(seconds - 1)}</div>
				<div class="row">{formatMinutesOrSeconds(seconds)}</div>
				<div class="row empty">&nbsp;</div>
				<div class="row empty">&nbsp;</div>
				<div class="row empty">&nbsp;</div>
			</div>
		</div>
		<div class="stressor">THE COMPETITION APPROACHES</div>
	</div>
</div>

<style lang="scss">
	.clock-wrapper {
		height: 57vw;

		color: $bkg;
		background: $darkblue;

		@media screen and (max-width: $mobile-width) {
			padding: 2em 0;
		}
	}

	.clock {
		font-family: 'Baloo';
		font-size: 15.95vw;
		font-weight: 1000;

		position: relative;

		display: flex;
		overflow: hidden;
		align-items: center;
		justify-content: center;

		height: 100%;

		.active,
		.inactive {
			display: flex;
			align-items: center;
			justify-content: center;

			width: 100%;
			height: 100%;
		}

		.inactive {
			opacity: 1;
			color: $blue;
		}

		.active {
			position: absolute;
			z-index: 10;

			.days {
				clip-path: polygon(0% 18%, 0% 31%, 100% 31%, 100% 18%);
			}

			.hours {
				clip-path: polygon(0% 51%, 0% 64%, 100% 64%, 100% 51%);
			}

			.minutes {
				clip-path: polygon(0% 68%, 0% 81%, 100% 81%, 100% 68%);
			}

			.seconds {
				clip-path: polygon(0% 34.5%, 0% 47.5%, 100% 47.5%, 100% 34.5%);
			}
		}

		.col {
			display: flex;
			align-items: center;
			flex-direction: column;

			width: 1.25em;
			margin: 0 -0.02em;

			@media screen and (max-width: $mobile-width) {
				margin: 0 0.01em;
			}

			&.days {
				width: 1.65em;
				margin: 0.02em;
			}

			.row {
				margin: -0.35em 0;
			}

			&.slide .row {
				animation: slideDown 400ms linear;
			}
		}

		.stressor {
			font-family: $font-sans;
			font-size: 0.1em;

			position: absolute;

			margin-bottom: 0.5rem;
			padding: 0.3em 4.4em;

			letter-spacing: 1em;

			color: $darkblue;
			border-radius: $border-radius;
			background: $white;

			@media (max-width: 768px) {
				display: none;
			}
		}
	}

	@keyframes slideDown {
		0% {
			transform: translateY(0);
		}

		100% {
			transform: translateY(0.9em);
		}
	}
</style>
