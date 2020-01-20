<template>
	<main class="overview">
		<section
			class="character__group"
			v-for="(charset, idx) in chars"
			:key="idx"
		>
			<h3 class="character__title">{{ charset.title }}</h3>
			<ul class="character__list">
				<li
					class="character__item"
					v-for="(char, idy) in charset.chars"
					:key="idy"
					v-clipboard="char"
					v-clipboard:success="clipboardSuccessHandler"
				>
					{{ char }}
					<button class="add-favorite" @click="addToBasket(char)">
						✱
					</button>
				</li>
			</ul>
		</section>
		<div class="dialog dialog--copy" :class="{ 'dialog--active': dialogShow }">
			Copied <span>{{ copied }}</span> to clipboard.
		</div>
	</main>
</template>
<script>
// @ is an alias to /src

export default {
	data: () => ({
		dialogShow: false,
		copied: null
	}),
	computed: {
		chars: {
			get() {
				return this.$store.getters["characters/GET_CHARACTERS"];
			}
		}
		// 	let obj = CharacterData.chars;
		// 	Object.keys(obj).map((key) => {
		// 		let str = obj[key];
		// 		obj[key] = {};
		// 		obj[key].title = key;
		// 		obj[key].characters = str.split("");
		// 	});
		// 	return obj;
		// },
		// filteredChars() {
		// 	if (this.currentCharset)
		// 		return Object.filter(
		// 			this.chars,
		// 			(set) => set.title == this.currentCharset
		// 		);
		// 	else return this.chars;
		// }
	},
	methods: {
		clipboardSuccessHandler({ value }) {
			this.$store.dispatch("dialog/ACTIVATE", { value: value, active: true });
		},

		addToBasket(val) {
			this.$store.dispatch("basket/addToBasket", val);
		}
	}
};
</script>

<style lang="scss">
.dialog {
	position: fixed;
	bottom: grid(1);
	left: 50%;
	@include block("_Brown");
	transform: translate(-50%, 0) scale(0);
	transition: transform $base-transition $base-cubic-bezier;
	&--active {
		transform: translate(-50%, -50%) scale(1);
	}
	&--copy {
		span {
			display: inline-block;
			padding: 0.5rem;
			margin: -0.5rem 0.5rem;
			border-radius: $base-border-radius;
			background-color: white;
		}
	}
}
.character {
	&__group {
		@include block();
		& + & {
			margin-top: 1rem;
		}
	}
	&__title {
		color: color(Skyblue);
	}
	&__list {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}
	&__item {
		position: relative;
		display: block;
		width: grid(2);
		height: grid(2);
		border-radius: $base-border-radius;
		background-color: color(Turquoise, 0);
		font-size: 1.5rem;
		line-height: grid(2);
		text-align: center;
		&:hover {
			background-color: color(Turquoise, 1);
		}
		.add-favorite {
			position: absolute;
			top: 0;
			right: 0;
			width: 1.5rem;
			height: 1.5rem;
			box-shadow: 0 2px 0 0 darken(color(_Yellow), 10%);
			border: none;
			border-radius: 50%;
			background-color: color(_Yellow);
			transform: translate(25%, -25%) scale(0);
			transition: transform $base-transition $base-cubic-bezier;
		}
		&:hover {
			.add-favorite {
				transform: translate(25%, -25%) scale(1);
			}
		}
	}
}
</style>
