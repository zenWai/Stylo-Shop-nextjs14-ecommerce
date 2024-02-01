import Grid from 'components/grid';

export default function Loading() {
  return (
    <Grid className="grid-cols-1 md:grid-cols-3">
      {Array(12)
        .fill(0)
        .map((_, index) => {
          return (
            <Grid.Item className="animate-pulse bg-neutral-100" key={index} />
          );
        })}
    </Grid>
  );
}
