using System;
using System.Collections.Generic;

namespace practicode3;

public partial class Item
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public bool? IsComplete { get; set; }

    public int UserId { get; set; }

    public virtual User User { get; set; } = null!;
}
