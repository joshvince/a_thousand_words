# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     AThousandWords.Repo.insert!(%AThousandWords.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

AThousandWords.Repo.delete_all AThousandWords.Artifacts.Picture 

AThousandWords.Repo.insert!(%AThousandWords.Artifacts.Picture{
  name: "Terringes Avenue", 
  description: "the second house I lived in as a child",
  year: 1995, 
  location: %Geo.Point{coordinates: {-0.39661288261413574, 50.82542338342201}, srid: nil}
})
