defmodule AThousandWords.FakeImageUploader do
  use Arc.Definition
  # Include ecto support (requires package arc_ecto installed):
  use Arc.Ecto.Definition

  @moduledoc """
  A mock image uploader to be used in tests.
  Stores images in `uploads/images` rather than on Amazon S3.

  Access this via the :image_uploader environment variable.
  """

  @versions [:original]

  def __storage, do: Arc.Storage.Local

  # To add a thumbnail version:
  # @versions [:original, :thumb]

  # Whitelist file extensions:
  # def validate({file, _}) do
  #   ~w(.jpg .jpeg .gif .png) |> Enum.member?(Path.extname(file.file_name))
  # end

  # Define a thumbnail transformation:
  # def transform(:thumb, _) do
  #   {:convert, "-strip -thumbnail 250x250^ -gravity center -extent 250x250 -format png", :png}
  # end

  # Override the persisted filenames:
  def filename(_version, _) do
    UUID.uuid4(:hex)
  end

  # Override the storage directory:
  def storage_dir(_version, _file_scope) do
    "uploads/images"
  end

  # Provide a default URL if there hasn't been a file uploaded
  # def default_url(version, scope) do
  #   "/images/avatars/default_#{version}.png"
  # end

  # Specify custom headers for s3 objects
  # Available options are [:cache_control, :content_disposition,
  #    :content_encoding, :content_length, :content_type,
  #    :expect, :expires, :storage_class, :website_redirect_location]
  #
  # def s3_object_headers(version, {file, scope}) do
  #   [content_type: Plug.MIME.path(file.file_name)]
  # end
end
