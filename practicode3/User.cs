using System;
using System.Collections.Generic;

namespace practicode3;

public partial class User
{
    public int Id { get; set; }

    public string UserName { get; set; } = null!;

    public string Password { get; set; } = null!;

    public virtual ICollection<Item> Items { get; set; } = new List<Item>();

    public static implicit operator List<object>(User v)
    {
        throw new NotImplementedException();
    }
}
