defmodule AThousandWords.ArtifactsTest do
  use AThousandWords.DataCase
  alias AThousandWords.TestImg
  alias AThousandWords.Artifacts

  describe "pictures" do
    alias AThousandWords.Artifacts.Picture

    @geoJSON_point %{"coordinates" => [-0.15157699584960938, 51.434106241971826], "type" => "Point"}

    @geoJSON_polygon %{ "coordinates" => [[[-0.1526927947998047, 51.42979863875662],
                        [-0.13385295867919922, 51.42979863875662],
                        [-0.13385295867919922, 51.4365407945686],
                        [-0.1526927947998047, 51.4365407945686],
                        [-0.1526927947998047, 51.42979863875662]]], "type" => "Polygon"}

    @valid_attrs %{year: 1960, name: "My Childhood Home", description: "Where I grew up", 
                   location: @geoJSON_point, image: TestImg.base64_img_params()}

    @update_attrs %{year: 1961, name: "My Childhood Home", description: "Where I grew up", location: @geoJSON_polygon}
    
    @invalid_attrs %{ year: "1999", description: 0001010101010101001, image: TestImg.base64_img_params()}

    @img_directory Application.get_env(:a_thousand_words, :image_directory)

    def picture_fixture(attrs \\ %{}) do
      {:ok, picture} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Artifacts.create_picture()

      picture
    end

    test "list_pictures/0 returns all pictures" do
      picture = picture_fixture()
      assert Artifacts.list_pictures() == [picture]
      on_exit(fn -> File.rm_rf @img_directory end)
    end

    test "get_picture!/1 returns the picture with given id" do
      picture = picture_fixture()
      assert Artifacts.get_picture!(picture.id) == picture
      on_exit(fn -> File.rm_rf @img_directory end)
    end

    test "create_picture/1 with valid data creates a picture" do
      assert {:ok, %Picture{}} = Artifacts.create_picture(@valid_attrs)
      on_exit(fn -> File.rm_rf @img_directory end)
    end

    test "create_picture/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Artifacts.create_picture(@invalid_attrs)
    end

    test "update_picture/2 with valid data updates the picture" do
      picture = picture_fixture()
      assert {:ok, picture} = Artifacts.update_picture(picture, @update_attrs)
      assert %Picture{} = picture
      on_exit(fn -> File.rm_rf @img_directory end)
    end

    test "update_picture/2 with invalid data returns error changeset" do
      picture = picture_fixture()
      assert {:error, %Ecto.Changeset{}} = Artifacts.update_picture(picture, @invalid_attrs)
      assert picture == Artifacts.get_picture!(picture.id)
      on_exit(fn -> File.rm_rf @img_directory end)
    end

    test "delete_picture/1 deletes the picture" do
      picture = picture_fixture()
      assert {:ok, %Picture{}} = Artifacts.delete_picture(picture)
      assert_raise Ecto.NoResultsError, fn -> Artifacts.get_picture!(picture.id) end
      on_exit(fn -> File.rm_rf @img_directory end)
    end

    test "change_picture/1 returns a picture changeset" do
      picture = picture_fixture()
      assert %Ecto.Changeset{} = Artifacts.change_picture(picture)
      on_exit(fn -> File.rm_rf @img_directory end)
    end
  end
end
