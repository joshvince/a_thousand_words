defmodule AThousandWords.Web.PictureView do
  use AThousandWords.Web, :view
  alias AThousandWords.Web.PictureView

  def render("index.json", %{pictures: pictures}) do
    %{data: render_many(pictures, PictureView, "picture.json")}
  end

  def render("show.json", %{picture: picture}) do
    %{data: render_one(picture, PictureView, "picture.json")}
  end

  def render("picture.json", %{picture: picture}) do
    %{id: picture.id}
  end
end
