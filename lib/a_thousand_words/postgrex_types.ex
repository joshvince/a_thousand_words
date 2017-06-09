
Postgrex.Types.define(AThousandWords.PostgrexTypes,
              [Geo.PostGIS.Extension] ++ Ecto.Adapters.Postgres.extensions(),
              json: Poison)