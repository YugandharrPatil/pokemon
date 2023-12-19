export default function PokemonList({ pokemon }) {
	return (
		<>
			{pokemon.map((pokemon) => (
				<p key={pokemon}>{pokemon}</p>
			))}
		</>
	);
}
