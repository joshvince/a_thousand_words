defmodule AThousandWords.Artifacts.Picture do
  use Ecto.Schema
  import Ecto.Changeset
  alias AThousandWords.Artifacts.Picture

  # Decide which image uploader to use based on the env. Tests will not ping S3.
  @image_uploader Application.get_env(:a_thousand_words, :image_uploader)

  schema "artifacts_pictures" do
    field :year, :integer
    field :name, :string
    field :description, :string
    field :location, Geo.Geometry
    field :image, :string
    timestamps()
  end

  @doc false
  def changeset(%Picture{} = picture, attrs) do
    picture
    |> cast(attrs, [:name, :description, :year, :location, :image])
    |> validate_required([:name, :description, :image])
  end

  @doc """
  Given some string-keyed map containing binary data representing an image,
  This will decode the binary data and upload it as per the spec in `ImageUploader`.
  Returns {:ok, image_path} if it succeeded
  """
  def upload_image(img_params) do
    img_params
    |> keys_to_atoms()
    |> decode_binary()
    |> @image_uploader.store()
  end

  defp keys_to_atoms(params) do
    Map.new(params, fn {k, v} -> {String.to_atom(k), v} end)
  end

  defp decode_binary(params) do
    Map.put(params, :binary, Base.decode64!(params.binary))
  end

  @doc """
  Get the url of the file
  """
  def get_image_url(filename) do
    @image_uploader.url(filename)
  end
end
