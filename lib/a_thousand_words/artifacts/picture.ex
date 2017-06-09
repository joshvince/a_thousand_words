defmodule AThousandWords.Artifacts.Picture do
  use Ecto.Schema
  import Ecto.Changeset
  alias AThousandWords.Artifacts.Picture


  schema "artifacts_pictures" do
    field :year, :integer
    field :name, :string
    field :description, :string
    field :location, Geo.Geometry
    timestamps()
  end

  @doc false
  def changeset(%Picture{} = picture, attrs) do
    picture
    |> cast(attrs, [])
    |> validate_required([])
  end
end
